export interface SignupRequestBody {
    name: string;
    email: string;
    phone: string;
    user_type: 'user' | 'agent';
    address?: string; 
  }
  
  export interface UserDocument {
    _id: string;
    name: string;
    email: string;
    phone: string;
    user_type: 'user' | 'agent';
    address?: string;
    email_verified: boolean;
    user_verified: boolean; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface JWTPayload {
    userId: string;
    email: string;
  }
  
  export interface VerificationSession {
    payload: JWTPayload;
    token: string;
    user_verified: boolean;
    email_verified: boolean;
  }
  
  
  export interface UserModel extends UserDocument, Document {
    refreshToken: string;
  }

  export interface DecodedUserModel {
    user: any
  }