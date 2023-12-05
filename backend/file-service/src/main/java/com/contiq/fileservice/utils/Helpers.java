package com.contiq.fileservice.utils;

import com.contiq.fileservice.entity.Page;
import com.contiq.fileservice.service.FileIndexService;
import com.contiq.fileservice.service.FileIndexServiceImplementation;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class Helpers {

    @Autowired
    private FileIndexService fileIndexService;

    public String extractPDFAndGetContent(InputStream fileInputStream) throws IOException {
        PDDocument document = PDDocument.load(fileInputStream);
        PDFTextStripper textStripper = new PDFTextStripper();
        return textStripper.getText(document);
    }

    public void createLocalFile(int userId, String fileName, byte[] fileByteArray) throws IOException {
        Path filePath = Paths.get("uploads" + File.separator + userId + File.separator + fileName);
        Files.createDirectories(filePath.getParent());
        if (Files.exists(filePath)) {
            Files.delete(filePath);
        }
        Files.createFile(filePath);
        Files.write(filePath, fileByteArray, StandardOpenOption.CREATE);
    }

    public void splitPDFAndCreateIndex(InputStream fileInputStream, int userId, String fileId,String documentName) throws IOException, ParseException {
        //fileIndexService.createIndex();
        PDDocument document = PDDocument.load(fileInputStream);
        PDFTextStripper textStripper = new PDFTextStripper();
        int no_of_pages = document.getNumberOfPages();
        for (int pageNumber = 1; pageNumber <=no_of_pages; pageNumber++) {
            textStripper.setStartPage(pageNumber);
            textStripper.setEndPage(pageNumber);
            String pageText = textStripper.getText(document).toString();
            pageText = pageText.replaceAll("\\[|\\]|\\(|\\)|\\+|\\-","");
            Page page = new Page(String.valueOf(fileIndexService.getLastInsertedId()), fileId, pageText,pageNumber,documentName,new Date(),userId);
            try {
                fileIndexService.addPageToIndex(page);
            } catch(Exception e ) {}
        }
    }
}