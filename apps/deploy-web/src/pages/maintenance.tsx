import React from "react";
import { Tools } from "iconoir-react";
import { NextSeo } from "next-seo";

import { Title } from "@src/components/shared/Title";

const Maintenance: React.FunctionComponent = () => {
  return (
    <div>
      <NextSeo title="Maintenance" />

      <div className="container pb-8 pt-4 sm:pt-8">
        <div className="py-12 text-center">
          <Title className="mb-2 text-2xl sm:text-5xl">Maintenance</Title>

          <Title subTitle className="!font-normal">
            We'll be right back!
          </Title>

          <div className="flex items-center justify-center pt-8">
            <Tools className="text-4xl text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
