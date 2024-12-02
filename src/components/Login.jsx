import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};

export const errorMessages = {
  ad: "En az üç karakter giriniz",
  soyad: "En az üç karakter giriniz",
  email: "Geçerli bir email giriniz",
  password: "En az sekiz karakter, en az bir büyük harf, en az bir küçük harf, en az bir sayı ve en az bir sembol içermelidir.",
};

export default function Register() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&\-+])[A-Za-z\d@.#$!%*?&\-+]{8,}$/;

  useEffect(() => {
    const allValid =
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      passwordRegex.test(formData.password);

    setIsValid(allValid);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update formData
    setFormData({ ...formData, [name]: value });

    // Update error states based on field name
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "ad":
      case "soyad":
        return value.trim().length < 3;
      case "email":
        return !validateEmail(value);
      case "password":
        return !passwordRegex.test(value);
      default:
        return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    axios
    .post("https://reqres.in/api/users", formData)  // Gerçek API URL'sini buraya yazın
    .then((response) => {
      setId(response.data.id);
      setFormData(initialValues);  // Başarılı bir şekilde gönderildikten sonra formu sıfırla
    })
    .catch((error) => {
      console.warn(error);  // Eğer API isteği başarısız olursa hatayı yakala
    });
  };

  return (
    <Card>
      <CardHeader>Kayıt Ol</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          {/* Ad Field */}
          <FormGroup>
            <Label for="ad">Ad:</Label>
            <Input
              id="ad"
              name="ad"
              placeholder="Adınızı giriniz"
              type="text"
              onChange={handleChange}
              value={formData.ad}
              invalid={errors.ad}
              data-cy="ad-input"
            />
            {errors.ad && <FormFeedback data-cy="error-message">{errorMessages.ad}</FormFeedback>}
          </FormGroup>

          {/* Soyad Field */}
          <FormGroup>
            <Label for="soyad">Soyad:</Label>
            <Input
              id="soyad"
              name="soyad"
              placeholder="Soyadınızı giriniz"
              type="text"
              onChange={handleChange}
              value={formData.soyad}
              invalid={errors.soyad}
              data-cy="soyad-input"

            />
            {errors.soyad && <FormFeedback data-cy="error-message">{errorMessages.soyad}</FormFeedback>}
          </FormGroup>

          {/* Email Field */}
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Kurumsal e-mail adresinizi girin."
              type="email"
              onChange={handleChange}
              value={formData.email}
              invalid={errors.email}
              data-cy="email-input"

            />
            {errors.email && <FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
          </FormGroup>

          {/* Password Field */}
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Güçlü bir şifre seçiniz."
              type="password"
              onChange={handleChange}
              value={formData.password}
              invalid={errors.password}
              data-cy="password-input"

            />
            {errors.password && (<FormFeedback data-cy="error-message"
              >{errorMessages.password}</FormFeedback>)}
          </FormGroup>

          <Button disabled={!isValid}  data-cy="submit-button"
          >Kayıt Ol</Button>
        </Form>
      </CardBody>
      {id &&<CardFooter data-cy="response-message">

  ID={id}
       </CardFooter>}
    </Card>
    
  );
}
