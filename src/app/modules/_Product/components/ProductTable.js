import React from "react";
import MUIDataTable from "mui-datatables";
import * as productAxios from "../_redux/productAxios";
import Grid from "@material-ui/core/Grid";
import ProductSearch from "./ProductSearch";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import * as swal from "../../Common/components/SweetAlert";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import Card from "../../Common/components/Card/Card.js";
import CardHeader from "../../Common/components/Card/CardHeader.js";
import GridContainer from "../../Common/components/Grid/GridContainer.js";
import GridItem from "../../Common/components/Grid/GridItem.js";
import { makeStyles } from '@material-ui/core/styles';

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const useStyles = makeStyles((theme) => ({
  Paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

function ProductTable(props) {
    const [paginated, setPaginated] = React.useState({
        page: 1,
        recordsPerPage: 10,
        orderingField: "",
        ascendingOrder: true,
        searchValues: {
          productName: ""
        }
    });

    const [totalRecords, setTotalRecords] = React.useState(0);

    const [data, setData] = React.useState([]);
  
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        //load data from api
        loadData();
      }, [paginated]);
    
      const handleAdd = () => {
        props.history.push(`/product/new`)
      };
  
      const handleDelete = (id,name) => {
        //confirm
        swal.swalConfirm("ยืนยัน?", `ต้องการลบ รหัส: ${id} ชื่อ: ${name} ?`).then((res) => {
          debugger;
          if (res.isConfirmed) {
            //delete
            productAxios
              .deleteProduct(id)
              .then((res) => {
                debugger;
                if (res.data.isSuccess) {
                  //reload
                  swal.swalSuccess("ลบสำเร็จ", `รหัส: ${id} ชื่อ: ${name} สำเร็จ.`).then(() => {
                    loadData();
                  });
                }
                else { 
                  swal.swalError("ลบไม่สำเร็จ", `รหัส: ${id} ชื่อ: ${name} ไม่สามารถลบได้.` )
                }
              })
              .catch((err) => {
                //network error
                swal.swalError("Error", err.message);
              });
          }
        });
      };
    
      const handleEdit = (id) => {
        props.history.push(`/product/edit/${id}`)
      }
    
      const handleSearch = (values) => {
        setPaginated({
          ...paginated,
          page: 1,
          searchValues: values
        });
    }
    
    const columns = [
        {
          name: "id",
          label: "รหัสสินค้า",
        },
        {
          name: "name",
          label: "ชื่อสินค้า"
        },
        {
            name: "price",
            label: "ราคา"
        },
        {
            name: "productGroupId",
            label: "รหัสประเภทสินค้า"
        },
        {
            name: "stockCount",
            label: "จำนวนสินค้า"
        },
        {
          name: "createById",
          label: "ผู้สร้าง",
          sort: false,
        },
        {
          name: "CreatedDate",
          label: "วันที่สร้าง",
          sort: false,
          options: {
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                <Grid
                  style={{ padding: 0, margin: 0 }}
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {dayjs(data[dataIndex].CreatedDate).format("DD/MM/YYYY")}
                </Grid>
              );
            },
          },
        },
        {
          name: "isActive",
          label: "สถานะการใช้งาน",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
              if (value === true) { 
                return <div>
                <FormControlLabel
                control={<Checkbox checked={value} icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" color='primary' />}
                label="เปิดการใช้งาน"
                />
              </div>;
              }
              else { 
                debugger;
                return <div>
                <FormControlLabel
                control={<Checkbox checked={value} icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                label="ปิดการใช้งาน"
                />
              </div>;
              }
              
            }
          }
        },
        {
          name: "",
          label: "จัดการรายการ",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                <Grid
                  style={{ padding: 0, margin: 0 }}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <EditButton
                    style={{ marginRight: 5 }}
                    onClick={() => {
                      handleEdit(data[dataIndex].id);
                    }}
                  >
                    Edit
                  </EditButton>
                  <DeleteButton
                    onClick={() => {
                      handleDelete(data[dataIndex].id);
                    }}
                  >
                    Delete
                  </DeleteButton>
                </Grid>
              );
            },
          },
        },
    ];
    
      const loadData = () => {
        setIsLoading(true);
        productAxios
          .getProductFilter(
            paginated.orderingField,
            paginated.ascendingOrder,
            paginated.page,
            paginated.recordsPerPage,
            paginated.searchValues.productName
          )
          .then((res) => {
            debugger;
            if (res.data.isSuccess) {
              //flatten data
              if (res.data.totalAmountRecords > 0) {
                let flatData = [];
                res.data.data.forEach((element) => {
                  flatData.push(flatten(element));
                });
                setData(flatData);
              }
              setTotalRecords(res.data.totalAmountRecords);
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            alert(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
    };
    
    const options = {
        filterType: "checkbox",
        print: false,
        download: false,
        filter: false,
        search: false,
        selectableRows: "none",
        serverSide: true,
        count: totalRecords,
        page: paginated.page - 1,
        rowsPerPage: paginated.recordsPerPage,
        onTableChange: (action, tableState) => {
          switch (action) {
            case "changePage":
              setPaginated({ ...paginated, page: tableState.page + 1});
              break;
            case "sort":
              setPaginated({
                ...paginated,
                orderingField: `${tableState.sortOrder.name}`,
                ascendingOrder:
                  tableState.sortOrder.direction === "asc" ? true : false,
              });
              break;
            case "changeRowsPerPage":
              setPaginated({
                ...paginated,
                recordsPerPage: tableState.rowsPerPage,
              });
              break;
            default:
            //  console.log(`action not handled. [${action}]`);
          }
        },
    };
    
    return (
        <Formik
      // Initial form Field Section
      initialValues={{
        // identityCardNo: "",
        // employeeCode: "",
        // firstName: "",
        // lastName: "",
      }}
      // Validation Section
      validate={async (values) => {
        const errors = {};
        //TODO: if you want validate somethingm put in here.
        return errors;
      }}
      // Form Submission
      onSubmit={async (values, { setSubmitting }) => {
        props.submit(values);
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, values, errors, resetForm }) => (
        //Render form
        //xs-md-lg
        <Form>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <ProductSearch
                    submit={handleSearch.bind(this)}
                    // submit={setSearchValues.bind(this)}
                ></ProductSearch>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            <Card >
                <CardHeader color="info">Product Table</CardHeader>
                <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={handleAdd.bind(this)}
          >
            Add New Product
          </Button>
                {/* <ProductGroupAddButton
                  onClick={() => {
                    handleAdd();
                  }}
                ></ProductGroupAddButton> */}
                  <MUIDataTable
                    title={
                  <Typography variant="h6">
                        
                        {isLoading && (
                      <CircularProgress
                            size={24}
                            style={{ position: "relative", top: 4 }}
                          />
                        )}
                  </Typography>
                    }
                    data={data}
                    columns={columns}
                    options={options}
                />
                </Card>
                </GridItem>
              </GridContainer>
            </Form>
            
            
    //     <div>
    //   {/* search */}
    //   <ProductGroupSearch
    //     submit={handleSearch.bind(this)}
    //     // submit={setSearchValues.bind(this)}
    //   ></ProductGroupSearch>
    //   <MUIDataTable
    //     title={
    //       <Typography variant="h6">
    //         Manage Product Group
    //         {isLoading && (
    //           <CircularProgress
    //             size={24}
    //             style={{ marginLeft: 15, position: "relative", top: 4 }}
    //           />
    //         )}
    //       </Typography>
    //     }
    //     data={data}
    //     columns={columns}
    //     options={options}
    //   />
    //   {/* {JSON.stringify(data)} */}
    // </div>


           
      )}
        </Formik>
    )
}

export default ProductTable
