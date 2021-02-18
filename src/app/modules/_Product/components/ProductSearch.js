/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
//import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "../../Common/components/Card/Card.js";
import CardBody from "../../Common/components/Card/CardBody.js";
import CardHeader from "../../Common/components/Card/CardHeader.js";
import GridContainer from "../../Common/components/Grid/GridContainer.js";
import GridItem from "../../Common/components/Grid/GridItem.js";

function ProductSearch(props) {
    return (
        <GridContainer>
              <GridItem xs={12} sm={12} md={12}></GridItem>
              <Card style={{width: '100%',height:'50'}}>
                <CardHeader color="info">Product Search</CardHeader>
                <Formik
        //Form fields and default values
        initialValues={{
          productName: ""
        }}
        //Validation section
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        //Form Submission
        // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
        onSubmit={(values, { setSubmitting }) => {
          props.submit(values);
          setSubmitting(false);
        }}
      >
        {/* Render form */}
        {({ submitForm, isSubmitting, values, errors, resetForm }) => (

          <Form>
            <Grid container >
              <Grid style={{marginLeft:'2%',marginTop:'1%'}}  item xs={3} lg={3}>
                <Field 
                  fullWidth
                  component={TextField}
                  required
                  type="text"
                  label="ใส่คำค้นหา"
                  name="productName"
                />
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ marginTop: 10 }}
                spacing={3}
              >
                <Grid style={{paddingBottom:'4%'}} item xs={3} lg={3}>
                  {isSubmitting && <LinearProgress />}
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    disabled={isSubmitting}
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid style={{paddingBottom:'4%'}} item xs={3} lg={3}>
                  {isSubmitting && <LinearProgress />}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Search
                  </Button>
                  </Grid>
                  
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      </Card>
      
              </GridContainer>

  // <Card elevation={3} style={{marginBottom:5}} >
  //   <CardContent>
  //     <Typography
  //       style={{fontSize:14}}
  //       gutterBottom
  //     >
  //       Search conditions
  //     </Typography>

      
    //</CardContent>
  //</Card>
);
}


export default ProductSearch
