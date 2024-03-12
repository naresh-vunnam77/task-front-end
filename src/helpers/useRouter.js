import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    let [query] = useSearchParams()
    return (
      <Component { ...props } router={ { location, navigate, params, query } } />
    )
  }

  return ComponentWithRouterProp
}