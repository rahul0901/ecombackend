import ProductModals from "../Modals/Product.Modals.js";

export const addProduct = async (req, res) => {

    try {

        const { prodName, prodPrice, prodDescription, prodImages, prodCategory, id } = req.body.products;

        if (!prodName || !prodImages || !prodDescription || !prodPrice || !prodCategory) {
            return res.status(404).json({ success: false, message: 'All Fields Required..' })
        }

        const product = new ProductModals({
            pname: prodName,
            pdescription: prodDescription,
            pprice: prodPrice,
            pcategory: prodCategory,
            pimages: prodImages,
            userId: id
        })

        await product.save();

        return res.status(201).json({ success: true, message: 'Product Added Successfully!', product:product})

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error while Adding Product API catch' })
    }

}

export const allProducts = async (req, res) => {
    try {

        const product = await ProductModals.find()

        if (!product) return res.status(404).json({ success: false, message: 'No Products Found!' })

        return res.status(200).json({ success: true, message: 'Products Found', product: product })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'All Products Error!', error: error.message })
    }
}

export const singleProduct = async (req, res) => {
    try {

        const { prodId } = req.body;

        console.log(prodId, 'prodId')

        if (!prodId) return res.status(404).json({ success: false, message: ' Product Id not found!' })

        const product = await ProductModals.findById(prodId);

        if (!product) return res.status(404).json({ success: false, message: 'Product not Found!' })

        return res.status(200).json({ success: true, message: 'Single Product Found!', product: product })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Single Product Error!', error: error.message })
    }
}