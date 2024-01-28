interface Props {
  title: string;
}

const TitleBox = (props: Props) => {
  const {title} = props;

  return (
    <div className="title-box">
      <h3>{title}</h3>
    </div>
  );
};

export default TitleBox;
