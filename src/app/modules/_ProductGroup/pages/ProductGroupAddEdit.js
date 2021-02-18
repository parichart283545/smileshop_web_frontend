/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
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
import * as productGroupAxios from "../_redux/productGroupAxios";
import { swalError, swalSuccess } from "../../Common/components/SweetAlert";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch } from 'formik-material-ui';
//import IconPicker from "../../Common/components/CustomInput/IconPicker/IconPicker";

function ProductGroupAddEdit(props) {
    const URL_AFTERSUBMIT = "/productGroup"
    const [toggle, setToggle] = React.useState(false);
    const [textCh, setTextCh] = React.useState('');
  
    let { id } = useParams();
 
  const [state, setState] = React.useState({
    id: 0,
    name: "",
      isActive: true,
      activeText:''
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
    //Load by Id
    debugger;
      if (id!=undefined) {
        LLLL();
    }
  }, [id]);


  const LLLL = () => {     debugger;
    productGroupAxios
      .getProductGroupById(id)
      .then((res) => {
          if (res.data.isSuccess) {
              debugger;
            setState({
            ...state,
            name: res.data.data.name,
            id: res.data.data.id,
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
          proGrpname: state.name,
        isActive: state.isActive
      }}
      //Validation section
      validate={(values) => {
        const errors = {};

        if (!values.proGrpname) {
          errors.name = "Required";
        }

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={(values, { setSubmitting }) => {
        let objPayload = { ...state, id: values.id, name: values.proGrpname, isActive: values.isActive };
          if (state.id) {
          //Edit
          productGroupAxios
            .editProductGroup(objPayload)
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
          productGroupAxios
            .addProductGroup(objPayload)
            .then((res) => {
              if (res.data.isSuccess) {
                swalSuccess(" Success", `${objPayload.proGrpname} Created.`).then(
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
                    Edit Product Group ({state.name})
                  </Typography>
                ) : (
                  <Typography variant="h6">New Product Group</Typography>
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
                    name="proGrpname"
                                      value={values.proGrpname}
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

export default ProductGroupAddEdit;
