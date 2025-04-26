"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({
  title,
  description,
  link,
  image,
}: {
  title: string;
  description: string;
  link: string;
  image: string;
}) => {
  return (
      <Link href={link} className="border-border-primary group card-effect h-fit min-h-[450px] w-full overflow-hidden rounded-xl border-2">
        <div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="h-[450px] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            height={600}
            width={600}
            className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="absolute bottom-0 z-10 h-fit w-full bg-gradient-to-t from-black via-black to-transparent p-3 px-5 pt-8 text-center">
          <h1 className="text-text-primary text-3xl font-bold">{title}</h1>
          <p className="text-immortal gold-shadow-text">{description}</p>
        </div>
      </Link>
  );
};

export default Card;
