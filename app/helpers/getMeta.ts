import { META_TITLE } from "~/constants/meta";

interface Params {
  title?: string;
}

const getMeta = ({ title }: Params) => {
  return {
    title: title ? `${title} | ${META_TITLE}` : META_TITLE,
  };
};

export default getMeta;
