import React from "react";

// components

import { CardProfile, CardSettings } from "@/components/Cards";


// layout for page


import { AdminLayout } from "@/layouts/Admin";


export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Settings.layout = AdminLayout;
