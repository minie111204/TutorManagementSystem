package com.database241.onlinetutorfinding.repository;


import com.database241.onlinetutorfinding.response.TutorApplicationFunctionResponseDto;
import com.database241.onlinetutorfinding.response.TutorSummaryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
@RequiredArgsConstructor
public class TutorDao
{
    private final JdbcTemplate jdbcTemplate;


    public List<TutorSummaryResponseDto> getTutorSummary
            (
                    Integer minClassNum,
                    Long minClassMoney,
                    Integer pageNumber,
                    Integer pageSize
            )
    {
        String sql = "{CALL get_tutor_class_summary(?, ?, ?, ?)}";

        return jdbcTemplate
                .query
                        (
                                sql,
                                (rs, rowNum) -> TutorSummaryResponseDto
                                        .builder()
                                        .tutorId(rs.getLong("tutor_id"))
                                        .tutorName(rs.getString("tutor_name"))
                                        .phoneNumber(rs.getString("phone_number"))
                                        .sex(rs.getString("sex"))
                                        .dateOfBirth(rs.getObject("date_of_birth", LocalDateTime.class).toLocalDate().toString())
                                        .biography(rs.getString("biography"))
                                        .numberOfClass(rs.getInt("number_of_class"))
                                        .earnedMoney(rs.getLong("earned_money"))
                                        .build(),
                                minClassNum,
                                minClassMoney,
                                pageNumber,
                                pageSize
                        );
    }


    public TutorApplicationFunctionResponseDto getTutorApplicationSummary(int tutorId)
    {
        String sql = "SELECT * FROM dbo.fn_TutorApplicationSummary(?)";


        List<TutorApplicationFunctionResponseDto> result = jdbcTemplate
                .query
                        (
                                sql,
                                (rs, rowNum) -> TutorApplicationFunctionResponseDto
                                        .builder()
                                        .tutorId(rs.getInt("tutor_id"))
                                        .acceptedCount(rs.getInt("accepted_count"))
                                        .deniedCount(rs.getInt("denied_count"))
                                        .errorMessage(rs.getString("error_message"))
                                        .build(),
                                tutorId
                        );
        return result.isEmpty() ? null : result.get(0);
    }
}



