import Image from "next/image";

interface Props {
  title?: string;
  content?: string;
  url?: string;
  name?: string;
  introduction?: string;
}

const InfoBox = (props: Props) => {
  const {title, content, url, name, introduction} = props;

  return (
    <div className="info-box">
      <h3>{title}</h3>
      <h1 className="m-0" style={{ fontSize: 50 }}>{content}</h1>
      {url &&
        <Image
          style={{ objectFit: "cover" }}
          src={url}
          width={500}
          height={150}
          alt="icon"
        />
      }
      <div className="text-start">
        <h2>{name}</h2>
        <p>{introduction}</p>
      </div>
    </div>
  );
};

export default InfoBox;
