export interface UserResponses {
  id: number,
  email: string,
  name: string,
  status?: "Happy" | "Sad"
  phoneNumbers: string[]
}
