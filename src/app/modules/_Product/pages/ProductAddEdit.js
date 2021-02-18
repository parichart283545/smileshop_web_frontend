import * as React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Icon from "@material-ui/core/Icon";
import { useParams } from "react-router-dom";
import * as productAxios from "../_redux/productAxios";
import { swalError, swalSuccess } from "../../Common/components/SweetAlert";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch } from 'formik-material-ui';



function ProductAddEdit(props) {

    const URL_AFTERSUBMIT = "/product"
    const [toggle, setToggle] = React.useState(false);
    const [textCh, setTextCh] = React.useState('');
  
    let { id } = useParams();
 
  const [state, setState] = React.useState({
    id: 0,
    name: "",
    price: 0,
    productGroupId: 0,
    stockCount:0,
    isActive: true
  });

    const handleToggle = ({setFieldValue},e) => {
        //toggle ? setToggle(false) : setToggle(true);
  
  
        //let v = values.isActive;
  
  
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        debugger;
        if (!value) { 
            //setToggle(false);
            setTextCh( "ปิดใช้งาน");
        } else {
            //setToggle(true);
            setTextCh( "เปิดใช้งาน");
        }
        setFieldValue(name, value);
  
    };
      
    React.useEffect(() => {
      debugger;
        if (id!=undefined) {
          LoadData();
      }
    }, [id]);
  
  
    const LoadData = () => {
        debugger;
      productAxios
        .getProduct(id)
        .then((res) => {
            if (res.data.isSuccess) {
                debugger;
              setState({
              ...state,
              name: res.data.data.name,
              id: res.data.data.id,
              price: res.data.data.price,
              productGroupId: res.data.data.productGroupId,
              stockCount: res.data.data.stockCount,
              isActive: res.data.data.isActive
              });
                if (res.data.data.isActive) {
                    setTextCh("เปิดใช้งาน");
                } else { 
                    setTextCh( "ปิดใช้งาน");
                 }
  
                setToggle(res.data.data.isActive);
          } else {
            swalError("Error", res.data.message).then(() => {
              props.history.push(URL_AFTERSUBMIT)
            });
          }
        })
        .catch((err) => {
          swalError("Error", err.message).then(() => {
            props.history.push(URL_AFTERSUBMIT)
          });
        });}


    return (
        <Formik
          //Form fields and default values
          enableReinitialize
              initialValues={{
              id: state.id,
              prodName: state.name,
              lprice: state.price,
              productGroupId: state.productGroupId,
              stockCount:state.stockCount,
            isActive: state.isActive
          }}
          //Validation section
          validate={(values) => {
            const errors = {};
    
            if (!values.prodName) {
              errors.prodName = "Required";
              }
              if (!values.lprice) {
                errors.lprice = "Required";
              }
              if (!values.productGroupId) {
                errors.productGroupId = "Required";
              }
              if (!values.stockCount) {
                errors.stockCount = "Required";
              }
    
            return errors;
          }}
          //Form Submission
          // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
          onSubmit={(values, { setSubmitting }) => {
              let objPayload = {
                  ...state,
                  id: values.id,
                  name: values.prodName,
                  price: values.lprice,
                  productGroupId: values.productGroupId,
                  stockCount:values.stockCount,
                  isActive: values.isActive
              };
              if (state.id) {
              //Edit
              productAxios
                .editProduct(objPayload)
                .then((res) => {
                  if (res.data.isSuccess) {
                    swalSuccess(
                      "Success",
                      `แก้ไขสำเร็จ`
                    ).then(() => {
                      setSubmitting(false);
                      props.history.push(URL_AFTERSUBMIT);
                    });
                  } else {
                    swalError("Error", res.data.message);
                  }
                })
                .catch((err) => {
                    setSubmitting(false);
                  swalError("Error", err.message);
                });
            } else {
              //Add
              productAxios
                .addProduct(objPayload)
                .then((res) => {
                  if (res.data.isSuccess) {
                    swalSuccess(" Success", `${objPayload.name} Created.`).then(
                      () => {
                        setSubmitting(false);
                        props.history.push(URL_AFTERSUBMIT);
                      }
                    );
                  } else {
                    swalError("Error", res.data.message);
                  }
                })
                .catch((err) => {
                    setSubmitting(false);
                  swalError("Error", err.message);
                });
            }
              }}
    
        >
          {/* Render form */}
          {({ submitForm, isSubmitting, values, errors ,setFieldValue}) => (
            <div>
              <Paper style={{ padding: 20 }} elevation={3}>
                <Form>
                  <Grid style={{ marginBottom: 10 }} container>
                    {id ? (
                      <Typography variant="h6">
                        Edit Product ({state.name})
                      </Typography>
                    ) : (
                      <Typography variant="h6">New Product</Typography>
                    )}
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        required
                        type="text"
                        label="Name"
                        name="prodName"
                                          value={values.prodName}
                                          onChange={(e)=> {setFieldValue(e.target.name,e.target.value)}}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                                  <FormControlLabel name="chActive"
                                      control={
                                          <Field
                                              label=""
                                              name="isActive"
                                              component={Switch}
                                              onChange={(e) => { handleToggle({setFieldValue},e) }}
                                              checked={values.isActive} // can't set/get state here
                                          //value={values.isActive} // or here
                                          />
                                      }
                                      label={ textCh}
                    />
                    </Grid>
                  
                            </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        required
                        type="text"
                        label="Price"
                        name="lprice"
                                          value={values.lprice}
                                          onChange={(e)=> {setFieldValue(e.target.name,e.target.value)}}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                       <Field
                           fullWidth
                           component={TextField}
                           required
                           type="text"
                           label="ProductGroup Id"
                           name="productGroupId"
                                             value={values.productGroupId}
                                             onChange={(e)=> {setFieldValue(e.target.name,e.target.value)}}
                         />
                    </Grid>
                  
                            </Grid>
                            
                            <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        required
                        type="text"
                        label="Stock Available"
                        name="stockCount"
                                          value={values.stockCount}
                                          onChange={(e)=> {setFieldValue(e.target.name,e.target.value)}}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                                  
                    </Grid>
                  
                   </Grid>
                   <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Grid item xs={12} lg={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="default"
                        disabled={isSubmitting}
                        onClick={() => {
                          props.history.push(URL_AFTERSUBMIT);
                        }}
                      >
                        <Icon>arrow_back</Icon>
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      {isSubmitting && <LinearProgress />}
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                  {/* <br></br>
                  values :{JSON.stringify(values)}
                  <br></br>
                  errors :{JSON.stringify(errors)} */}
                </Form>
              </Paper>
            </div>
          )}
        </Formik>
      );
}

export default ProductAddEdit
