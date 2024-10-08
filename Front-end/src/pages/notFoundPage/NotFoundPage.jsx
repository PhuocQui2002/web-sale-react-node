
import React, { useState, useEffect } from "react";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";


function NotFoundPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập một trạng thái loading trong 3 giây
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingComponent isPending={loading}>
      <div>Content Loaded!</div>
    </LoadingComponent>
  );
}

export default NotFoundPage
