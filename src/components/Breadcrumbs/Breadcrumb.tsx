import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName, link=[{link:null , to:"#"}] }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          
          {link?.map((pageName_,index)=>(
                      <li className="font-medium text-primary">
                          <Link to={pageName_.to}>
                            {pageName_.link||pageName } /
                          </Link>
                      </li>

            ))}
        
          
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
