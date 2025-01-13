function status(request, response) {
    response.status(200).json({
        field_1: "Testing 1",
        field_2: {
          sub_field: "subfield content são",
        },
    });
}

export default status;