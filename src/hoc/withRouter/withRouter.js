import {
    useLocation,
    useNavigate,
    useParams,
    useFetcher,
  } from "react-router-dom";
  import React from "react";

  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      let fetcher = useFetcher();
      return (
        <Component
          {...props}
          router={{ location, navigate, params, fetcher }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

  export default withRouter;