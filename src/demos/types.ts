export type ContactCreateModel = {
  name: string;
  email: string;
  phone: string;
};

export type ContactApiModel = ContactCreateModel & {
  id: string;
  createdAt: string;
};
