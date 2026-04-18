"use client";

import { useState } from "react";
import styles from "./ProductInfoTabs.module.css";

interface ProductInfoTabsProps {
  dict: any;
  product: any;
  description: string;
}

export default function ProductInfoTabs({ dict, product, description }: ProductInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<"info" | "desc">("info");

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabHeaders}>
        <button 
          className={`${styles.tabHeader} ${activeTab === 'info' ? styles.active : ''}`}
          onClick={() => setActiveTab('info')}
        >
          {dict.productDetail.features || "Thông tin sản phẩm"}
        </button>
        <button 
          className={`${styles.tabHeader} ${activeTab === 'desc' ? styles.active : ''}`}
          onClick={() => setActiveTab('desc')}
        >
          {dict.productDetail.description || "Mô tả sản phẩm"}
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'info' && (
          <div className={styles.infoTab}>
            <table className={styles.infoTable}>
              <tbody>
                <tr>
                  <th>{dict.productDetail.brand}</th>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <th>{dict.productDetail.series}</th>
                  <td>{product.series}</td>
                </tr>
                <tr>
                  <th>{dict.productDetail.line}</th>
                  <td>{product.line}</td>
                </tr>
                <tr>
                  <th>{dict.productDetail.scale}</th>
                  <td>{product.scale}</td>
                </tr>
                <tr>
                  <th>{dict.productDetail.type}</th>
                  <td>{product.type}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.features}>
              <h4>{dict.productDetail.features}</h4>
              <ul>
                {product.features.map((feature: string, idx: number) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'desc' && (
          <div className={styles.descTab}>
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
