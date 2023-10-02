// MyButton.tsx
import {extendVariants, Input} from "@nextui-org/react";

export const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
    //   violet: "bg-[#8b5cf6] text-[#fff]",
    },

   
  },
 
  

});