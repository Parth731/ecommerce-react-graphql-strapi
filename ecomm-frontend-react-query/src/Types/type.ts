export type CardType = {
  name: string;
  price: number;
  description: string;
  images: {
    data: ImageType[];
  };
};

export type cardAttribute = {
  id: string;
  attributes: CardType;
};

export type ImageType = {
  id: string;
  attributes: {
    name: string;
    url: string;
  };
};
