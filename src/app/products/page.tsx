import { ReactElement, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { SectionTitle } from "@components/SectionTitle";
import { Project, PROJECTS } from "@data";
import "@styles/App.css";

type ProductCardProps = {
  product: Project;
  roundedIcon?: boolean;
};

const ProductCard = ({ product, roundedIcon }: ProductCardProps) => {
  const ConditionalWrapper = ({
    condition,
    wrapper,
    children,
  }: {
    condition: boolean;
    wrapper: (children: ReactNode) => ReactElement;
    children: ReactNode;
  }) => (condition ? wrapper(children) : children);
  return (
    <div
      className={`flex flex-col relative ${product.link ? "project-card" : "project-card-no-link"}`}
    >
      <ConditionalWrapper
        condition={product.link != null}
        wrapper={(children: ReactNode) => (
          <Link href={product.link!} style={{ textDecoration: "none", color: "inherit" }}>
            {children}
          </Link>
        )}
      >
        <div className="w-40 h-40 bg-ycs-gray rounded-full absolute top-[-80px] left-1/2 -translate-x-1/2 flex justify-center items-center">
          <Image
            className={`${roundedIcon ? "rounded-full w-32 h-32" : "w-28 h-28"}`}
            src={product.image}
            loading="lazy"
            alt={product.name}
          />
        </div>
        <div style={{ fontWeight: 500, fontSize: "25px", marginTop: "80px" }}>{product.name}</div>
        <div style={{ fontWeight: 400, fontSize: "18px", margin: "40px 20px" }}>
          {product.description}
        </div>
      </ConditionalWrapper>
    </div>
  );
};

interface ProductGridProps {
  live: boolean;
}

const ProductGrid = ({ live }: ProductGridProps) => (
  <div className="product-grid">
    {PROJECTS.filter((project) => project.live === live).map((project, i) => (
      <ProductCard product={project} roundedIcon={project.shouldIconBeRounded} key={i} />
    ))}
  </div>
);

const Products = () => {
  return (
    <div className="product-container">
      <SectionTitle
        title="Products"
        subtitle="From a campus-wide student directory to your class-scheduling needs, we've got you covered."
      />
      <h2 className="text-3xl font-bold my-20 text-center">Live Products</h2>
      <ProductGrid live />
      <h2 className="text-3xl font-bold my-20 text-center">Products in Production</h2>
      <ProductGrid live={false} />
    </div>
  );
};

export default Products;
