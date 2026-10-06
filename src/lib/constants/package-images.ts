export interface PackageImageDisplay {
  cardImage?: string;
  detailImage?: string;
  cardAspectRatio: string;
  detailAspectRatio: string;
  cardObjectPosition: string;
  detailObjectPosition: string;
}

export const PACKAGE_IMAGE_CONFIG: Record<string, PackageImageDisplay> = {
  'essential-packages': {
    cardImage: '/images/paket/paket-essential.jpg',
    detailImage: '/images/paket/paket-essential.jpg',
    cardAspectRatio: 'aspect-[4/5]',
    detailAspectRatio: 'aspect-[4/5] max-w-xl mx-auto lg:mx-0',
    cardObjectPosition: '50% 36%',
    detailObjectPosition: '50% 36%',
  },
  'signature-packages': {
    cardImage: '/images/paket/paket-signature-card-hd.jpg',
    detailImage: '/images/paket/paket-signature-hd.jpg',
    cardAspectRatio: 'aspect-[4/5]',
    detailAspectRatio: 'aspect-[16/10] sm:aspect-[16/11] w-full',
    cardObjectPosition: 'center center',
    detailObjectPosition: 'center center',
  },
  'prestige-packages': {
    cardImage: '/images/paket/paket-prestige-card-hd.jpg',
    detailImage: '/images/paket/paket-prestige-hd.jpg',
    cardAspectRatio: 'aspect-[4/5]',
    detailAspectRatio: 'aspect-[16/10] sm:aspect-[16/11] w-full',
    cardObjectPosition: 'center center',
    detailObjectPosition: 'center center',
  },
};

export function getPackageImageConfig(slug: string): PackageImageDisplay {
  return (
    PACKAGE_IMAGE_CONFIG[slug] || {
      cardAspectRatio: 'aspect-[4/5]',
      detailAspectRatio: 'aspect-[16/10]',
      cardObjectPosition: 'center center',
      detailObjectPosition: 'center center',
    }
  );
}
