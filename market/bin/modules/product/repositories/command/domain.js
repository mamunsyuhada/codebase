const { v4: uuid } = require('uuid');
const Product = require('../../../../models/products');
const { ok, err, ErrorResponsesCode, OkResponsesCode } = require('../../../../utils/response');

const addProduct = async(payload) => {
    const ctx = 'DomainProduct-addProduct';
    try {
        const { user_id } = payload.user;
        delete payload.user;
        const data = await new Product({
            product_id: uuid(),
            ...payload,
            created_by: user_id,
            created_at: new Date(),
            modified_by: user_id,
            modified_at: new Date(),
        }).save();
        return ok({ data, message: 'success to add product', code: OkResponsesCode.Ok });
    } catch (error) {
        console.error(`[${ctx}] :`, error.message);
        return err({ message: error.message, code: ErrorResponsesCode.Conflict });
    }
};

const updateProduct = async(payload) => {
    const ctx = 'DomainProduct-updateProduct';
    try {
        const { product_id, user: { user_id } } = payload;
        delete payload.user;

        const product = await Product.findOneAndUpdate(
            { product_id, is_deleted: false },
            {
                ...payload,
                modified_by: user_id,
                modified_at: new Date(),
            },
            { new: true }
        );
        if(product===null){
            return err({ message: 'Not found product', code: ErrorResponsesCode.NotFound });
        }
        return ok({ data: product, message: 'success to update product', code: OkResponsesCode.Created });
    } catch (error) {
        console.error(`[${ctx}] :`, error.message);
        return err({ message: error.message, code: ErrorResponsesCode.BadRequest });
    }
};

const deleteProduct = async(payload) => {
    const ctx = 'DomainProduct-deleteProduct';
    try {
        const { product_id, user: { user_id } } = payload;
        delete payload.user;

        const product = await Product.findOneAndUpdate(
            { product_id, is_deleted: false },
            {
                is_deleted: true,
                modified_by: user_id,
                modified_at: new Date(),
            },
            { new: true }
        );
        if(product===null){
            return err({ message: 'Not found product', code: ErrorResponsesCode.NotFound });
        }
        return ok({ data: product, message: 'success to delete product', code: OkResponsesCode.Ok });
    } catch (error) {
        console.error(`[${ctx}] :`, error.message);
        return err({ message: error.message, code: ErrorResponsesCode.BadRequest });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
};