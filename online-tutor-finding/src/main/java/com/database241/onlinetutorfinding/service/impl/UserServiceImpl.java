package com.database241.onlinetutorfinding.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.database241.onlinetutorfinding.entity.address.Address;
import com.database241.onlinetutorfinding.entity.clAss.ConsultationReq;
import com.database241.onlinetutorfinding.entity.clAss.TutorApplication;
import com.database241.onlinetutorfinding.entity.user.Administrator;
import com.database241.onlinetutorfinding.entity.user.Student;
import com.database241.onlinetutorfinding.entity.user.SystemUser;
import com.database241.onlinetutorfinding.entity.user.Tutor;
import com.database241.onlinetutorfinding.exception.ResourceNotFoundException;
import com.database241.onlinetutorfinding.repository.ConsultationReqRepository;
import com.database241.onlinetutorfinding.repository.SystemUserRepository;
import com.database241.onlinetutorfinding.repository.TutorApplicationRepository;
import com.database241.onlinetutorfinding.response.AdminInformationResponse;
import com.database241.onlinetutorfinding.response.ConsultationReqResponse;
import com.database241.onlinetutorfinding.response.StudentInformationResponse;
import com.database241.onlinetutorfinding.response.TutorApplicationResponse;
import com.database241.onlinetutorfinding.response.TutorInformationResponse;
import com.database241.onlinetutorfinding.response.UserContactResponse;
import com.database241.onlinetutorfinding.service.UserService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

        @Autowired
        private SystemUserRepository systemUserRepository;

        @Autowired
        private JdbcTemplate jdbcTemplate;

        @Autowired
        private TutorApplicationRepository tutorApplicationRepository;

        @Autowired
        private ConsultationReqRepository consultationReqRepository;

        @Override
        public Object getInformation(Long id) throws Exception {
                SystemUser user = systemUserRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                if (user instanceof Administrator admin) {
                        return AdminInformationResponse.builder().birthday(admin.getDateOfBirth())
                                        .cccd(admin.getNationalId())
                                        .contact(admin.getUserContacts().stream()
                                                        .map((item) -> UserContactResponse.builder()
                                                                        .association(item.getId().getSocialMediaLink())
                                                                        .email(item.getId().getContactEmail())
                                                                        .phoneNumber(item.getId()
                                                                                        .getContactPhoneNumber())
                                                                        .build())
                                                        .collect(Collectors.toSet()))
                                        .fullname(admin.getFullName()).hometown(admin.getPlaceOfOrigin())
                                        .sex(admin.getUserSex()).build();
                } else if (user instanceof Tutor tutor) {
                        return TutorInformationResponse.builder()
                                        .address(tutor.getAddresses().stream().map(it -> buildAddress(it))
                                                        .collect(Collectors.toSet()))
                                        .bio(tutor.getBio())
                                        .birthday(tutor.getDateOfBirth()).cccd(tutor.getNationalId())
                                        .codeInvited(tutor.getInvitedCode() != null
                                                        ? tutor.getInvitedCode().getInvitingCode()
                                                        : "")
                                        .codeInviting(tutor.getInvitingCode())
                                        .contact(tutor.getUserContacts().stream()
                                                        .map((item) -> UserContactResponse.builder()
                                                                        .association(item.getId().getSocialMediaLink())
                                                                        .email(item.getId().getContactEmail())
                                                                        .phoneNumber(item.getId()
                                                                                        .getContactPhoneNumber())
                                                                        .build())
                                                        .collect(Collectors.toSet()))
                                        .dateJoin(tutor.getDateJoined()).fullname(tutor.getFullName())
                                        .hometown(tutor.getPlaceOfOrigin())
                                        .nOfInvitations(tutor.getNOfInvitations()).rate(tutor.getRate())
                                        .sex(tutor.getUserSex()).build();
                } else if (user instanceof Student student) {
                        return StudentInformationResponse.builder()
                                        .address(student.getAddresses().stream().map(it -> buildAddress(it))
                                                        .collect(Collectors.toSet()))
                                        .contact(student.getUserContacts().stream()
                                                        .map((item) -> UserContactResponse.builder()
                                                                        .association(item.getId().getSocialMediaLink())
                                                                        .email(item.getId().getContactEmail())
                                                                        .phoneNumber(item.getId()
                                                                                        .getContactPhoneNumber())
                                                                        .build())
                                                        .collect(Collectors.toSet()))
                                        .fullname(student.getFullName()).grade(student.getStuGrade())
                                        .school(student.getStuSchool())
                                        .sex(student.getUserSex()).build();
                }
                throw new Exception("Anonymous user is forbidden");
        }

        private String buildAddress(Address address) {
                StringBuilder addressBuilder = new StringBuilder();
                addressBuilder.append(address.getHouseNumber()).append(", ").append(address.getStreetName())
                                .append(", ")
                                .append(address.getWard().getWardName()).append(", ")
                                .append(address.getWard().getDistrictCity().getDistrictCityName()).append(", ")
                                .append(address.getWard().getDistrictCity().getProvince().getProvinceName());
                return addressBuilder.toString();
        }

        @Override
        public Page<TutorApplicationResponse> getTutorApplications(Integer pageNo, Integer pageSize) {
                Pageable pageable = PageRequest.of(pageNo, pageSize);
                Page<TutorApplication> taPage = tutorApplicationRepository.findAll(pageable);
                List<TutorApplicationResponse> responses = taPage.stream().map(it -> TutorApplicationResponse.builder().idStudent(it.getStudent().getId()).idTutor(it.getTutor().getId())
                                .address(buildAddress(it.getAddress())).idAddr(it.getAddress().getId()).grade(it.getStudent().getStuGrade())
                                .id(it.getId()).nameStudent(it.getStudent().getFullName())
                                .nameTutor(it.getTutor().getFullName()).phoneNumber(it.getStudent().getPhoneNumber())
                                .requirement(it.getRequirement()).status(it.getTaStatus())
                                .styleTeaching(it.getTeachingStyle().getTsName()).subjects(it.getSubjects().stream()
                                                .map(item -> item.getSubjectName()).collect(Collectors.toList()))
                                .build()).collect(Collectors.toList());
                return new PageImpl<>(responses, pageable, responses.size());
        }

        @Override
        public Page<ConsultationReqResponse> getConsultations(Integer pageNo, Integer pageSize) {
                Pageable pageable = PageRequest.of(pageNo, pageSize);
                Page<ConsultationReq> cqPage = consultationReqRepository.findAll(pageable);
                List<ConsultationReqResponse> responses = cqPage.stream().map(it -> ConsultationReqResponse.builder()
                                .address(buildAddress(it.getAddress())).grade(it.getStudent().getStuGrade()).idStudent(it.getStudent().getId())
                                .id(it.getId()).nameStudent(it.getStudent().getFullName())
                                .phoneNumber(it.getStudent().getPhoneNumber()).status(it.getCqStatus())
                                .subjects(it.getSubjects().stream().map(item -> item.getSubjectName())
                                                .collect(Collectors.toList()))
                                .teachingStyle(it.getTeachingStyles().stream().map(item -> item.getTsName())
                                                .collect(Collectors.joining(", ")))
                                .build()).collect(Collectors.toList());
                return new PageImpl<>(responses, pageable, responses.size());
        }

       @Override
public void updateStatusTa(Long id, String status) {
    try {
        String sql = "EXECUTE Update_Application_Status @Tutor_App_Status = ?, @Tutor_App_Id = ?";
        jdbcTemplate.update(sql, status, id);
        System.out.println("Stored procedure executed successfully!");
    } catch (DataAccessException e) {
        System.err.println("Error executing stored procedure: " + e.getMessage());
    }
}
}