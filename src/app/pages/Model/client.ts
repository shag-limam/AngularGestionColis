// src/app/models/client.model.ts
export interface ImageData {
    id: number;
    name: string;
    type: string;
    imageData: string;
  }
  // Adapted to ApiResponse
  export interface ApiResponse<T> {
    message?: string;
    data: T;
  }
 export interface Client {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  active : boolean;
  imageData?: {
    imageData: string;  // Base64 image or a URL
    type: string;       // Image type, e.g., 'image/jpeg'
  };
}

  
  // export interface ApiResponse<T> {
  //   message?: string;
  //   data: T;
  // }
  
  // export interface Client {
  //   id?: number;
  //   fullName: string;
  //   email: string;
  //   phoneNumber: string;
  //   address: string;
  //   password?: string;
  //   active?: boolean;
  //   imageData?: any;
  // }
  
  