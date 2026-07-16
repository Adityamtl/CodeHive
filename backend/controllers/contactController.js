import axios from "axios";

export const contactUs = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, message } = req.body;
        
        let response = await axios.post("https://script.google.com/macros/s/AKfycbzP_8ad-wlmKx9BKG_ucLRn1961piqgN_NEU3aJYsr7xWBiSTzmQa3Yoj3BPrMwocl7/exec", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            message: message
        })

        return res.status(200).json({
            success: true,
            data: response.data
        });
        
    } catch (error) {
        console.log("Error in contact us", error);

        return res.status(500).json({
            success: false,
            message: "Error in contact"
        })
    }
}