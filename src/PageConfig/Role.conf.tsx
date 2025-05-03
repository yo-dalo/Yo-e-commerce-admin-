import MultiInput from '../components/InputsX/MultiInput';
import Update from '../pages/Update';
import Page_ from '../pages/Page';
import Create from '../pages/Create';
import DataDisplay from '../pages/DataDisplay';
import SelectRoleParmitions from '../components/PartX/SelectRoleParmitions';

const RoleDisplay = [
{
       path: "/roles/display/:id",
      pageName: "_",
      page: <DataDisplay
        pageName=""
        url={"http://localhost:5000/api/roles/"}
        title={"eCommerce Dashboard | create item-variants "}
        


      />,



    }
];

const Role = [
  [
    {
      path: "/roles",
      pageName: "Rolls",
      title:"Rolls",
      page: <Page_
        pageName={"Rolls"}
        url={"http://localhost:5000/api/roles/"}
        title={"eCommerce Dashboard | create roles "}
        felds={[{ inputTypy: "text" }]}


      />,


    },
    {
      path: "/roles/create",
      pageName: "Rolls",
      url: "http://localhost:5000/api/roles/",
      title: "eCommerce Dashboard | create roles ",
      felds: [{ inputTypy: "text" }],
      page: <Create
      
           children={<SelectRoleParmitions onPermissionChange={(permissions) => handleMulti("permissions", permissions)} />}

      
      
        pageName={"Rolls"}
        url="http://localhost:5000/api/roles/"
        inputs={[
          { type: "text", name: "role_name" },
          { type: "option", name: "status", url: "http://localhost:5000/api/helper/statusOption", valueBy: "value", optionBy: "status" },
        ]}

      />,
    },
    {

      path: "/roles/update/:id",
      pageName: "Rolls",
      url: "http://localhost:5000/api/roles/",
      title: "eCommerce Dashboard | create roles ",
      felds: [{ inputTypy: "text" }],
      page: <Update

        name="Rolls"
        url="http://localhost:5000/api/roles/"
        inputs={[
          { type: "text", name: "role_name" },
          //    {type:"file",  name:"role_name"},
          { type: "option", name: "status", url: "http://localhost:5000/api/helper/statusOption/", valueBy: "value", optionBy: "status" },
        ]}

      />,
    },
...RoleDisplay
  ],
  ///DataDisplay user
];




export {Role}




//docs
/*






*/