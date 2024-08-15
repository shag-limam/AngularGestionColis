// src/app/models/client.model.ts
export interface ImageData {
  id: number;
  name: string;
  type: string;
  imageData: string;
}

export interface Client {
  id: number;
  fullName: string;
  email: string;
  active: boolean;
  password?: string; // Peut-être non utilisé côté client
  imageData?: ImageData; // Optionnel si l'image n'est pas toujours présente
  createdAt: string;
  updatedAt: string;
  address: string;
  phoneNumber: string;
  enabled: boolean;
  authorities: any[]; // Définissez un type plus précis si vous avez une structure pour les autorités
  username: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}
