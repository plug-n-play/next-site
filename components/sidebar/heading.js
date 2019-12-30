export default function Heading({ title, children }) {
  return (
    <div className="heading">
      <h4>{title}</h4>
      <div className="posts">{children}</div>
      <style jsx>{`
        h4 {
          margin: 1.25rem 0;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .posts {
          margin-left: 4px;
        }
      `}</style>
    </div>
  );
}
