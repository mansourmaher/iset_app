import Image from "next/image";

export function PrimaryFeatures() {
  const compaines = [
    {
      name: "Facebook",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/87602a05d6b80695359dc331f2a745a6.png?auto=format%2Ccompress&dpr=1",
    },
    {
      name: "Facebook",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/c5ee723406a053a78a85bc35f5b50681.png?auto=format%2Ccompress&dpr=1",
    },
    {
      name: "Facebook",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/e6636c6b8d2d141cbee6bf14f4b3d185.png?auto=format%2Ccompress&dpr=1",
    },

    {
      name: "Apple",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f93d412349e801238d46a2b167695c43.png?auto=format%2Ccompress&dpr=1",
    },
    {
      name: "Facebook",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/2fe47744cde1a0e41e409bf488e98027.png?auto=format%2Ccompress&dpr=1",
    },

    {
      name: "Apple",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/94d374b55f8a5d9bfbaaf42a578f7ac5.png?auto=format%2Ccompress&dpr=1",
    },
    {
      name: "Facebook",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/3c51760da56b41955094211c3a4cd179.png?auto=format%2Ccompress&dpr=1",
    },
  ];

  return (
    <div className="container mx-auto lg:px-40 px-6 ">
      <div className="flex flex-col space-y-4 text-center">
        <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
          Learn from 325+ top universities and companies
        </h2>
        <p className="text-lg tracking-tight text-slate-700">
          Build skills with courses, certificates, and degrees online from
          world-class universities and companies
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {compaines.map((company, index) => (
            <img
              src={company.image}
              alt={company.name}
              key={index}
              width={250}
              height={250}
              className="rounded-lg hover:shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
