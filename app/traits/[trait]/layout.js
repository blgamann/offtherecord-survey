import results from "../../data/result";

export const generateMetadata = ({ params }) => {
  const traitKey = Object.keys(results).find(
    (key) => results[key].slug === params.trait
  );
  const trait = traitKey ? results[traitKey] : null;

  return {
    title: `${trait?.subtitle} ${trait?.title}`,
    description: trait?.ogDescription,
    openGraph: {
      title: `${trait?.subtitle} ${trait?.title}`,
      description: trait?.ogDescription,
      images: [
        {
          url: `https://offtherecord.nicetomeetme.kr/og-${trait?.key}.png`,
        },
      ],
      url: `https://offtherecord.nicetomeetme.kr/traits/${trait?.slug}`,
    },
  };
};

export default function TraitsLayout({ children }) {
  return <>{children}</>;
}
