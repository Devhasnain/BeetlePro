import mjml2html from "mjml"

export default function OrderStatusEmailTemp(name, title, order_id, order_date, price) {
    let response = `<mjml>
        <mj-body background-color="#ccd3e0" font-size="13px">
            <mj-section background-color="#356cc7" padding-bottom="0px" padding-top="0">
                <mj-column width="100%">
                    <mj-text align="center" font-size="13px" color="#ABCDEA" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="18px" padding-top="28px">Hello
                        <p style="font-size:16px; color:white">${name}</p>
                    </mj-text>
                </mj-column>
            </mj-section>
            <mj-section background-color="#356cc7" padding-bottom="5px" padding-top="0">
                <mj-column width="100%">
                    <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="0px" padding-top="0"></mj-divider>
                    <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="28px" padding-top="28px"><span style="font-size:20px; font-weight:bold">
                    ${title}
                    </mj-text>
                </mj-column>
            </mj-section>
            <mj-section background-color="#568feb" padding-bottom="15px">
                <mj-column>
                    <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>Order Number</strong></mj-text>
                    <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">${order_id}</mj-text>
                </mj-column>
                <mj-column>
                    <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>Order Date</strong></mj-text>
                    <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">${order_date}</mj-text>
                </mj-column>
                <mj-column>
                    <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>Total Price</strong></mj-text>
                    <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">${price}</mj-text>
                </mj-column>
            </mj-section>
            <mj-section background-color="#356CC7" padding-bottom="20px" padding-top="20px">
                <mj-column width="50%">
                    <mj-button background-color="#EF4D23" color="#FFF" font-size="14px" align="center" font-weight="bold" border="none" padding="15px 30px" border-radius="10px" href="https://mjml.io" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="10px">View Now</mj-button>
                </mj-column>
            </mj-section>
            <mj-section background-color="#356cc7" padding-bottom="5px" padding-top="0">
                <mj-column width="100%">
                    <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="0px" padding-top="0"></mj-divider>
                    <mj-text align="center" color="#FFF" font-size="15px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="20px">
                        <span style="font-size:15px">The BeetlePro Team.</span>
                    </mj-text>
                </mj-column>
            </mj-section>
        </mj-body>
    </mjml>`;

    const { html, errors } = mjml2html(response);
    return { html, errors };
}