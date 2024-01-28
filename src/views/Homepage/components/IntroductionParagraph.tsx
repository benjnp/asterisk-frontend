interface Props {
  content: React.ReactNode;
}

const IntroductionParagraph = (props: Props) => {
  const {content} = props;

  return (
    <div className="introduction-paragraph">
      <p className='mt-3'>
        {content}
      </p>
    </div>
  );
};

export default IntroductionParagraph;
