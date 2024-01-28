interface Props {
  title: string;
  link: string;
}

const RedirectLink = (props: Props) => {
  const {title, link} = props;

  return (
    <div className="redirect-link">
      <a href={link} target="_blank" className='mt-3' rel="noreferrer">
        {title}
      </a>
    </div>
  );
};

export default RedirectLink;
