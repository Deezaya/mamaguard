/**
 * Shared type definitions for API responses and domain models
 */

// ===== Auth =====
export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  name: string;
  phone: string;
  password: string;
  gestational_history?: {
    pregnancies: number;
    previous_complications: boolean;
  };
  known_risk_factors?: {
    hypertension: boolean;
    diabetes: boolean;
    preeclampsia_history: boolean;
  };
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ===== Profile =====
export interface Profile {
  id?: number;
  name: string;
  weeks: number;
  childNum: number;
  risks: string[];
  eContact: string;
  ePhone: string;
  setupComplete: boolean;
}

// ===== Streaming & Vitals =====
export interface StreamSession {
  session_id: string;
  status: 'started' | 'active' | 'stopped';
  message?: string;
}

export interface FrameProcessResponse {
  session_id: string;
  frame_number: number;
  heart_rate: number;
  heart_rate_confidence: number;
  respiratory_rate: number;
  respiratory_rate_confidence: number;
  status: string;
}

export interface StreamStatus {
  session_id: string;
  status: string;
  frames_processed: number;
  heart_rate: number;
  heart_rate_confidence: number;
  respiratory_rate: number;
  respiratory_rate_confidence: number;
  last_update: string;
  duration_seconds: number;
}

export interface StopStreamResponse {
  session_id: string;
  status: string;
  frames_processed: number;
  heart_rate: number;
  heart_rate_confidence: number;
  respiratory_rate: number;
  respiratory_rate_confidence: number;
  duration_seconds: number;
  message: string;
}

// ===== Checklist & Risk Assessment =====
export interface DangerSignsChecklist {
  severe_headache: boolean;
  blurred_vision: boolean;
  abdominal_pain: boolean;
  sudden_swelling: boolean;
  shortness_of_breath: boolean;
}

export interface ChecklistResponse {
  session_id: string;
  danger_sign_count: number;
  risk_tier: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  risk_score: number;
  message: string;
}

export interface RiskScore {
  session_id: string;
  risk_tier: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  risk_score: number;
  heart_rate: number;
  hrv: number;
  danger_signs_count: number;
  rules_applied: {
    elevated_heart_rate: boolean;
    low_hrv: boolean;
    danger_signs_present: boolean;
    known_risk_factors: boolean;
  };
  recommendation: string;
  created_at: string;
}

export interface ScanSummary {
  session_id: string;
  total_frames: number;
  heart_rate: number;
  hrv: number;
  risk_tier: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  risk_score: number;
  checklist: DangerSignsChecklist & {
    id: number;
    scan_session_id: string;
    danger_sign_count: number;
    created_at: string;
  };
  recommendation: string;
  duration_seconds: number;
  created_at: string;
}

// ===== Hospitals =====
export interface Hospital {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  distance: number;
}

export interface NearbyHospitalsResponse {
  count: number;
  hospitals: Hospital[];
}

// ===== Scan =====
export interface ScanSession {
  id: string;
  user_id: number;
  started_at: string;
  ended_at?: string;
  status: 'active' | 'completed' | 'failed';
  heart_rate?: number;
  hrv?: number;
  respiratory_rate?: number;
  total_frames?: number;
  risk_tier?: string;
  risk_score?: number;
}

// ===== Error =====
export interface ApiError {
  detail: string;
}
