import { ATTRIBUTES } from "~/utils/constants";

type AttributeKey = keyof typeof ATTRIBUTES;

const AttributesTag = ({primary_att}: {primary_att: AttributeKey}) => {
  return (
    <div className="absolute top-2 left-2 z-10">
      <div
        className={`flex h-6 w-8 items-center justify-center rounded-full bg-black/90 border-${ATTRIBUTES[primary_att]?.color} text-${ATTRIBUTES[primary_att]?.color}`}
      >
        <span className={ATTRIBUTES[primary_att]?.color}>●</span>
      </div>
    </div>
  );
};

export default AttributesTag;
