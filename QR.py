import qrcode

url="https://shreyasrambade.github.io/Cyber-Crime-Awareness/"

image=qrcode.make(url)
image.save("Quiz_QR.png")

print("QR Save successfully.")