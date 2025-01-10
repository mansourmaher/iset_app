import Image from "next/image";

export const Logo = () => {
  return (
    <div className="w-[140px]">
      <Image
        src="/logooftheapplication.png"
        alt="logo"
        width={6}
        height={6}
        layout="responsive"
        loading="lazy"
        className="rounded-full"
      />
    </div>
  );
};
