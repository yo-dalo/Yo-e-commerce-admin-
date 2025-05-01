import MultiInput from '../components/InputsX/MultiInput';
import Update from '../pages/Update';
import Page_ from '../pages/Page';
import Create from '../pages/Create';
import DataDisplay from '../pages/DataDisplay';

const AdminDisplay = [
{
      path: "/admins/display/:id",
      pageName: "_",
      page: <DataDisplay
        pageName=""
        url={"http://localhost:5000/api/admins/"}
        title={"eCommerce Dashboard | create admins "}
        
      />,


    }
];

const Admin = [
  [
    {
      path: "/admins",
      pageName: "admins",
      title:"admins",
      page: <Page_
        pageName={"admins"}
        url={"http://localhost:5000/api/admins/"}
        title={"eCommerce Dashboard | create admins "}
        felds={[{ inputTypy: "text" }]}


      />,


    },
    {
      path: "/admins/create",
      pageName: "Rolls",
      url: "http://localhost:5000/api/admins/",
      title: "eCommerce Dashboard | create admins ",
      felds: [{ inputTypy: "text" }],
      page: <Create
        pageName={"admins"}
        
        url="http://localhost:5000/api/admins/"
        inputs={[
          { type: "text", name: "name" },
          { type: "text", name: "password" },
          { type: "text", name: "email" },
          { type: "number", name: "phone" },
          { type: "number", name: "role_id" },
          { type: "file", name: "img", multiple: false },
          { type: "option", name: "status", url: "http://localhost:5000/api/helper/statusOption", valueBy: "value", optionBy: "status" },

        ]}

      />,
    },
    {

      path: "/admins/update/:id",
      pageName: "admins",
      url: "http://localhost:5000/api/admins/",
      title: "eCommerce Dashboard | create admins ",
      felds: [{ inputTypy: "text" }],
      page: <Update

        name="admins"
        url="http://localhost:5000/api/admins/"
                inputs={[
          { type: "text", name: "name" },
          { type: "text", name: "password" },
          { type: "text", name: "email" },
          { type: "number", name: "phone" },
          { type: "number", name: "role_id" },
          { type: "file", name: "img", multiple: false },
          { type: "option", name: "status", url: "http://localhost:5000/api/helper/statusOption", valueBy: "value", optionBy: "status" },

        ]}

      />,
    },
...AdminDisplay
  ],
  ///DataDisplay user
];




export {Admin}




//docs
/*






*/