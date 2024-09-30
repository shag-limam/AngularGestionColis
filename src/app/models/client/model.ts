// // src/app/models/client.model.ts
// export interface ImageData {
//   id: number;
//   name: string;
//   type: string;
//   imageData: string;
// }
// // Adapted to ApiResponse
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
//   imageData?: any; // Or your specific type for image data
//   active?: boolean;
//   createdAt?: Date;
//   updatedAt?: Date;
//   enabled?: boolean;
//   password?: string; // Add this line
// }

export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface Client {
  id?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password?: string;
  active?: boolean;
  imageData?: any;
}

