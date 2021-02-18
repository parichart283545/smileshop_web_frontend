import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

function ProductGroupAddButton(props) {
    return (
        <Formik
      initialValues={{
        //email: '',
        //password: '',
      }}
     
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   setSubmitting(false);
        //   alert(JSON.stringify(values, null, 2));
        // }, 500);
        debugger;
        props.history.push(`/productGroups/edit/${0}`)
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Add New ProductGroup
          </Button>
        </Form>
      )}
    </Formik>
    )
}

export default ProductGroupAddButton
