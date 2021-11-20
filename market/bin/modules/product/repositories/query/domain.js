const Product = require('../../../../models/products');
const { ok, err, ErrorResponsesCode, OkResponsesCode } = require('../../../../utils/response');

const listProduct = async() => {
    const ctx = 'DomainProduct-listProduct';
    try {
        const aggr = [
            { $match: {} }
        ];
        const data = await Product.aggregate(aggr);
        return ok({ data, message: 'success to list product', code: OkResponsesCode.Ok });
    } catch (error) {
        console.error(`[${ctx}] :`, error.message);
        return err({ message: error.message, code: ErrorResponsesCode.Conflict });
    }
};

const getProduct = async(payload) => {
    const { product_id } = payload;
    const data = await Product.findOne({ product_id, is_deleted: false });
    if(product===null){
        return err({ message: 'Not found product', code: ErrorResponsesCode.NotFound });
    }
    return ok({ data, message: 'success to get product', code: OkResponsesCode.Ok });
};

module.exports = { listProduct, getProduct };