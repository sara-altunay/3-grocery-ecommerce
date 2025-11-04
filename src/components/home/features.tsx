import { options } from "@/utils/constants";
import { FC } from "react";

const Features: FC = () => {
  return (
    <section className="mt-10 mb-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {options.map((option, key) => (
        <div
          key={key}
          className={`flex items-center gap-4 p-4 rounded-lg ${option.bgColor}`}
        >
          {option.icon}

          <div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
