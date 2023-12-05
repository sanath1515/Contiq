package com.contiq.fileservice.utils;

import co.elastic.thumbnails4j.core.Dimensions;
import co.elastic.thumbnails4j.core.Thumbnailer;
import co.elastic.thumbnails4j.core.ThumbnailingException;
import co.elastic.thumbnails4j.pdf.PDFThumbnailer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;

public class ThumbnailUtil {
   private ThumbnailUtil() {
    }

    public static byte[] generateThumbnail(MultipartFile file) throws IOException, ThumbnailingException {
        // Create a temporary file
        File input = File.createTempFile("temp", null);

        // Copy the uploaded file to the temporary file
        try (InputStream inputStream = file.getInputStream()) {
            Path tempFilePath = input.toPath();
            Files.copy(inputStream, tempFilePath, StandardCopyOption.REPLACE_EXISTING);
        }

        // Generate the thumbnail from the temporary file
        Thumbnailer thumbnailer = new PDFThumbnailer();
        List<Dimensions> outputDimensions = Collections.singletonList(new Dimensions(900, 430));
        BufferedImage output;
        try{
            List<BufferedImage> thumbnails = thumbnailer.getThumbnails(input, outputDimensions);
            if (!thumbnails.isEmpty()) {
                output = thumbnails.get(0);
                // Rest of your code
            } else {
                File responseFile = new File(ThumbnailUtil.class.getClassLoader().getResource("placeholder.png").getFile());
                output = ImageIO.read(responseFile);
            }
        }
        catch (Exception e){
            File responseFile = new File(ThumbnailUtil.class.getClassLoader().getResource("placeholder.png").getFile());
            output = ImageIO.read(responseFile);
        }
        String filePath = "thumb.png";
        File outputImageFile = new File(filePath);
        ImageIO.write(output, "png", outputImageFile);

        System.out.println("Image saved successfully to: " + filePath);

        // Convert the thumbnail to a byte array
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(output, "png", baos);
        byte[] byteArray = baos.toByteArray();

        // Delete the temporary file (optional, if no longer needed)
        input.delete();

        return byteArray;
    }
}
