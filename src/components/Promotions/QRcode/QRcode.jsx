import QRCode from "qrcode.react";

export const QRcode = (value) => {
	return (
      <QRCode
        id="qr-gen-value"
        value={value}
        size={180}
        level={"H"}
        includeMargin={true}
      />
  );
}



