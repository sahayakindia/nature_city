export default function PageHead({ kicker, title, accent, children, image }) {
  return (
    <header className="page-head">
      {image && <img src={image} alt="" className="page-head-img" />}
      <div className="page-head-shade" />
      <div className="container page-head-body">
        <p className="kicker">{kicker}</p>
        <h1 className="display page-title">
          {title} {accent && <span className="accent">{accent}</span>}
        </h1>
        {children && <p className="lede">{children}</p>}
      </div>
    </header>
  );
}
