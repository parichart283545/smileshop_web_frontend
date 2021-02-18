import React from 'react'
import ProductGroupTable from '../components/ProductGroupTable'


// const formik = useFormik({
//     enableReinitialize: true,
//     validate: (values) => {
//       const errors = {};
//       if (!values.searchValues) {
//         errors.searchValues = "กรุณากรอก";
//       }

//       return errors;
//     },
//     initialValues: {
//       searchValues:""
//     },
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });


function ProductGroup(props) {
    return (
        <div>
            {/* <ProductGroupSearch
            submit={handleSearch.bind(this)}
            ></ProductGroupSearch> */}
            <ProductGroupTable history={props.history}></ProductGroupTable>
        </div>
    )
}

export default ProductGroup
