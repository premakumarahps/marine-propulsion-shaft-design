/**
 * Marine Propulsion Shaft Physics & Mechanical Analysis Engine
 * Covers Torsional Mechanics, Combined Von Mises Stresses, IACS M68 Classification,
 * Hollow Shaft Optimization, Micro-Pit Fracture Mechanics, and Marin Fatigue Correction.
 */

export interface ShaftAnalysisResult {
  torqueNm: number;
  polarMomentMm4: number;
  crossSectionAreaMm2: number;
  massKg: number;
  solidEquivalentMassKg: number;
  weightSavingsPercent: number;
  torsionalShearStressMpa: number;
  axialStressMpa: number;
  combinedVonMisesStressMpa: number;
  angleTwistDeg: number;
  iacsMinDiameterMm: number;
  iacsCompliant: boolean;
  yieldSafetyFactor: number;
  fatigueSafetyFactorYear0: number;
  fatigueSafetyFactorYear10Uniform: number;
  fatigueSafetyFactorYear10Pitted: number;
  effectivePitStressMpa: number;
  correctedEnduranceLimitMpa: number;
}

export function computeShaftMechanics(
  powerKw: number,
  rpm: number,
  outerDiaMm: number,
  innerDiaMm: number,
  lengthMm: number,
  thrustKn: number,
  yieldMpa: number = 460, // Duplex 2205 baseline
  utsMpa: number = 680,
  shearModulusGpa: number = 80,
  densityKgM3: number = 7800
): ShaftAnalysisResult {
  // 1. Operating Torque: T = P / (2 * pi * n_rps)
  const rps = rpm / 60;
  const torqueNm = (powerKw * 1000) / (2 * Math.PI * rps);

  // 2. Geometric Properties
  const D = outerDiaMm;
  const d = innerDiaMm;
  const crossSectionAreaMm2 = (Math.PI / 4) * (Math.pow(D, 2) - Math.pow(d, 2));
  const solidAreaMm2 = (Math.PI / 4) * Math.pow(D, 2);
  const polarMomentMm4 = (Math.PI / 32) * (Math.pow(D, 4) - Math.pow(d, 4));

  // 3. Mass & Hollow Shaft Savings
  const volumeM3 = (crossSectionAreaMm2 * 1e-6) * (lengthMm * 1e-3);
  const solidVolumeM3 = (solidAreaMm2 * 1e-6) * (lengthMm * 1e-3);
  const massKg = volumeM3 * densityKgM3;
  const solidEquivalentMassKg = solidVolumeM3 * densityKgM3;
  const weightSavingsPercent = ((solidEquivalentMassKg - massKg) / solidEquivalentMassKg) * 100;

  // 4. Stresses under Nominal Loads
  // Torsional shear: tau = T * (D/2) / J
  const torqueNmm = torqueNm * 1000;
  const torsionalShearStressMpa = (torqueNmm * (D / 2)) / polarMomentMm4;

  // Axial stress from propeller thrust: sigma_a = F_thrust / Area
  const thrustN = thrustKn * 1000;
  const axialStressMpa = thrustN / crossSectionAreaMm2;

  // Bending stress (estimated self-weight & hydrodynamic deflection at mid-span ~ 25 MPa)
  const bendingStressMpa = 25.0;

  // Combined Von Mises Stress: sigma_eq = sqrt((sigma_a + sigma_b)^2 + 3 * tau^2)
  const normalStressSum = axialStressMpa + bendingStressMpa;
  const combinedVonMisesStressMpa = Math.sqrt(
    Math.pow(normalStressSum, 2) + 3 * Math.pow(torsionalShearStressMpa, 2)
  );

  // Angle of Twist: theta = (T * L) / (G * J) (converted to degrees)
  const gMpa = shearModulusGpa * 1000;
  const angleTwistRad = (torqueNmm * lengthMm) / (gMpa * polarMomentMm4);
  const angleTwistDeg = (angleTwistRad * 180) / Math.PI;

  // 5. IACS UR M68 Minimum Diameter Formula Check
  // D_min approx for marine rule with C1=1.22, C2=1.0 for hollow shafts
  const diameterRatio = d / D;
  const hollowFactor = 1 - Math.pow(diameterRatio, 4);
  const iacsAllowableShear = (utsMpa + 160) / 6.0; // Rule of thumb class allowable
  const iacsMinDiameterMm = Math.cbrt((16 * torqueNmm) / (Math.PI * iacsAllowableShear * hollowFactor));
  const iacsCompliant = D >= iacsMinDiameterMm;

  // 6. Fatigue & Failure Predictions
  // Healthy Year 0
  const yieldSafetyFactor = yieldMpa / combinedVonMisesStressMpa;
  const baseEnduranceMpa = utsMpa * 0.5; // ~340 MPa in air
  const kaHealthy = 0.8; // Machined
  const seCorrHealthy = baseEnduranceMpa * kaHealthy * 0.85; // ~231 MPa
  const fatigueSafetyFactorYear0 = seCorrHealthy / combinedVonMisesStressMpa;

  // Corroded Year 10 (Uniform thinning 2mm radius -> D=121, d=60)
  const D10 = Math.max(d + 10, D - 4.0); // 2mm radius loss = 4mm OD loss
  const J10 = (Math.PI / 32) * (Math.pow(D10, 4) - Math.pow(d, 4));
  const Area10 = (Math.PI / 4) * (Math.pow(D10, 2) - Math.pow(d, 2));
  const tau10 = (torqueNmm * (D10 / 2)) / J10;
  const sigmaA10 = thrustN / Area10;
  const vm10 = Math.sqrt(Math.pow(sigmaA10 + bendingStressMpa * 1.08, 2) + 3 * Math.pow(tau10, 2));
  const fatigueSafetyFactorYear10Uniform = seCorrHealthy / vm10;

  // Micro-Pitting Stress Concentration (Kt = 3.0, q = 0.8 => Kf = 2.6)
  const Kt = 3.0;
  const q = 0.8;
  const Kf = 1 + q * (Kt - 1); // 2.6
  const effectivePitStressMpa = vm10 * Kf;

  // Marin Seawater Surface Finish Degradation: ka drops to 0.5
  const kaPitted = 0.5;
  const correctedEnduranceLimitMpa = baseEnduranceMpa * kaPitted * 0.85; // ~136 MPa
  const fatigueSafetyFactorYear10Pitted = correctedEnduranceLimitMpa / effectivePitStressMpa;

  return {
    torqueNm: parseFloat(torqueNm.toFixed(1)),
    polarMomentMm4: parseFloat(polarMomentMm4.toExponential(3)),
    crossSectionAreaMm2: parseFloat(crossSectionAreaMm2.toFixed(1)),
    massKg: parseFloat(massKg.toFixed(2)),
    solidEquivalentMassKg: parseFloat(solidEquivalentMassKg.toFixed(2)),
    weightSavingsPercent: parseFloat(weightSavingsPercent.toFixed(1)),
    torsionalShearStressMpa: parseFloat(torsionalShearStressMpa.toFixed(2)),
    axialStressMpa: parseFloat(axialStressMpa.toFixed(2)),
    combinedVonMisesStressMpa: parseFloat(combinedVonMisesStressMpa.toFixed(2)),
    angleTwistDeg: parseFloat(angleTwistDeg.toFixed(3)),
    iacsMinDiameterMm: parseFloat(iacsMinDiameterMm.toFixed(1)),
    iacsCompliant,
    yieldSafetyFactor: parseFloat(yieldSafetyFactor.toFixed(2)),
    fatigueSafetyFactorYear0: parseFloat(fatigueSafetyFactorYear0.toFixed(2)),
    fatigueSafetyFactorYear10Uniform: parseFloat(fatigueSafetyFactorYear10Uniform.toFixed(2)),
    fatigueSafetyFactorYear10Pitted: parseFloat(fatigueSafetyFactorYear10Pitted.toFixed(2)),
    effectivePitStressMpa: parseFloat(effectivePitStressMpa.toFixed(1)),
    correctedEnduranceLimitMpa: parseFloat(correctedEnduranceLimitMpa.toFixed(1))
  };
}

/**
 * Calculates Pitting Resistance Equivalent Number (PREN)
 */
export function calculatePREN(crPercent: number, moPercent: number, nPercent: number, wPercent: number = 0): number {
  return crPercent + 3.3 * (moPercent + 0.5 * wPercent) + 16 * nPercent;
}
